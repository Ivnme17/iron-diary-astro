// Gestor de sesiones para Iron Diary
import { authApi } from '../../public/supabase-client.js';

class SessionManager {
    constructor() {
        this.currentUser = null;
        this.isInitialized = false;
    }

    // Inicializar el gestor de sesiones
    async init() {
        if (this.isInitialized) return;

        try {
            const user = await authApi.getCurrentUser();
            this.currentUser = user;
            this.isInitialized = true;

            // Escuchar cambios de autenticación
            authApi.onAuthStateChange((event, session) => {
                this.currentUser = session?.user || null;

                // Redirigir si no hay sesión y estamos en una página protegida
                if (!this.currentUser && this.isProtectedPage()) {
                    window.location.href = '/login';
                }
            });
        } catch (error) {
            console.error('Error initializing session:', error);
            this.isInitialized = true;
        }
    }

    // Verificar si el usuario está autenticado
    isAuthenticated() {
        return this.currentUser !== null;
    }

    // Obtener usuario actual
    getCurrentUser() {
        return this.currentUser;
    }

    // Verificar si la página actual requiere autenticación
    isProtectedPage() {
        const protectedPages = ['/dashboard-user', '/workout', '/profile'];
        const currentPath = window.location.pathname;
        return protectedPages.some(page => currentPath.startsWith(page));
    }

    // Redirigir al dashboard apropiado según autenticación
    redirectToAppropriateDashboard() {
        if (this.isAuthenticated()) {
            window.location.href = '/dashboard-user';
        } else {
            window.location.href = '/dashboard';
        }
    }

    // Cerrar sesión
    async signOut() {
        try {
            await authApi.signOut();
            this.currentUser = null;
            document.cookie = 'sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            window.location.href = '/login';
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }

    // Actualizar información del usuario en la UI
    updateUserInfo() {
        const userElements = document.querySelectorAll('[data-user-name]');
        userElements.forEach(element => {
            if (this.currentUser) {
                const displayName = this.currentUser.user_metadata?.full_name || this.currentUser.email;
                element.textContent = displayName;
            }
        });
    }

    // Configurar listeners para elementos de usuario
    setupUserElements() {
        // Botones de cerrar sesión
        document.querySelectorAll('[data-logout]').forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                this.signOut();
            });
        });

        // Click en información de usuario
        document.querySelectorAll('[data-user-info]').forEach(element => {
            element.addEventListener('click', () => {
                if (confirm('¿Cerrar sesión?')) {
                    this.signOut();
                }
            });
        });

        // Enlaces a dashboard
        document.querySelectorAll('[data-dashboard]').forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                this.redirectToAppropriateDashboard();
            });
        });

        // Actualizar información del usuario
        this.updateUserInfo();
    }
}

// Crear instancia global
export const sessionManager = new SessionManager();
