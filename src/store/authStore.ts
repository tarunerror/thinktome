import { create } from 'zustand';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  type User
} from 'firebase/auth';
import { auth } from '../config/firebase';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  initialize: () => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      set({ 
        user,
        isAuthenticated: !!user,
        isLoading: false
      });
    });

    return () => unsubscribe();
  },

  signInWithEmail: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      set({ 
        user: userCredential.user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to sign in',
        isLoading: false
      });
    }
  },

  signUpWithEmail: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      set({ 
        user: userCredential.user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to sign up',
        isLoading: false
      });
    }
  },

  signInWithGoogle: async () => {
    try {
      set({ isLoading: true, error: null });
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      set({ 
        user: userCredential.user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to sign in with Google',
        isLoading: false
      });
    }
  },

  signInWithGithub: async () => {
    try {
      set({ isLoading: true, error: null });
      const provider = new GithubAuthProvider();
      
      try {
        const userCredential = await signInWithPopup(auth, provider);
        set({ 
          user: userCredential.user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error: any) {
        if (error.code === 'auth/account-exists-with-different-credential') {
          // Get existing providers for the email
          const email = error.customData.email;
          const providers = await fetchSignInMethodsForEmail(auth, email);
          
          if (providers.includes('google.com')) {
            // If user has a Google account, prompt them to sign in with Google
            set({ 
              error: 'This email is already associated with a Google account. Please sign in with Google.',
              isLoading: false
            });
          } else if (providers.includes('password')) {
            // If user has an email/password account
            set({ 
              error: 'This email is already registered. Please sign in with email and password.',
              isLoading: false
            });
          } else {
            set({ 
              error: 'This email is already associated with another sign-in method.',
              isLoading: false
            });
          }
        } else {
          throw error;
        }
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to sign in with GitHub',
        isLoading: false
      });
    }
  },

  resetPassword: async (email: string) => {
    try {
      set({ isLoading: true, error: null });
      await sendPasswordResetEmail(auth, email);
      set({ isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to reset password',
        isLoading: false
      });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      await signOut(auth);
      set({ 
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to log out',
        isLoading: false
      });
    }
  },

  clearError: () => set({ error: null })
}));
