const getMenuFrontend = (role = 'Medic_Role') => {

    const menu = [{
            titulo: 'Usuarios',
            icono: 'mdi mdi-account-multiple',
            submenu: [
                // { titulo: 'Usuario', url: 'usuario'},

            ]
        },
        {
            titulo: 'Especialidades',
            icono: 'mdi mdi-clipboard-account',
            submenu: [
                // { titulo: 'Especialidad', url: 'especialidad'},

            ]
        },
        {
            titulo: 'Pacientes',
            icono: 'mdi mdi-wheelchair-accessibility',
            submenu: [
                { titulo: 'Pacientes', url: 'paciente' },

            ]
        },

        {
            titulo: 'Consultas',
            icono: 'mdi mdi-book-open-page-variant',
            submenu: [
                { titulo: 'Consultas Médicas', url: 'consultas' },

            ]
        },

        {
            titulo: 'Categorias',
            icono: 'mdi mdi-folder',
            submenu: [
                // { titulo: 'Categoria', url: 'categoria'},

            ]
        },
        {
            titulo: 'Productos',
            icono: 'mdi mdi-clipboard-text',
            submenu: [
                // { titulo: 'Producto', url: 'producto'},

            ]
        },
        {
            titulo: 'Ventas',
            icono: 'mdi mdi-cash-multiple',
            submenu: [
                // { titulo: 'Venta', url: 'venta' },

            ]
        }
    ];

    if (role === 'Admin_Role') {
        menu[0].submenu.push({ titulo: 'Usuario', url: 'usuario' });
        menu[1].submenu.push({ titulo: 'Especialidad', url: 'especialidad' });
        menu[4].submenu.push({ titulo: 'Categoria', url: 'categoria' });
        menu[5].submenu.push({ titulo: 'Producto', url: 'producto' });
        menu[6].submenu.push({ titulo: 'Venta', url: 'venta' });

    }
    if (role === 'Secrt_Role') {
        menu[0].submenu.push({ titulo: 'Usuario', url: 'usuario' });
        menu[1].submenu.push({ titulo: 'Especialidad', url: 'especialidad' });
        menu[4].submenu.push({ titulo: 'Categoria', url: 'categoria' });
        menu[5].submenu.push({ titulo: 'Producto', url: 'producto' });
        menu[6].submenu.push({ titulo: 'Venta', url: 'venta' });

    }
    return menu;
};

module.exports = {
    getMenuFrontend: getMenuFrontend
};