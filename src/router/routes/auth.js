const auth = {
    path: '/',
    name: 'Auth',
    redirect: { name: 'SigninComponent' },
    children: [
        {
            path: "/auth/signin",
            name: "SigninComponent",
            component: () => {
                if (auth === true) {
                    return import('@/views/Dashboard/DefaultPage.vue');
                } else {
                    return import('@/views/Auth/Signin.vue');
                }
            },
        },
        {
            path: "/auth/signup",
            name: "Signup",
            component: () => {
                if (auth === true) {
                    return import('@/views/Dashboard/DefaultPage.vue');
                } else {
                    return import('@/views/Auth/Signup.vue');
                }
            },
        },
    ],
};

export default auth;
