import { createWebHistory, createRouter } from 'vue-router';
import contentRoute from './content-route';

const routes = [...contentRoute];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
