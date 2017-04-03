define({
    // Pages - knockout components that serve as pages
    pages: [
        { name: 'home-page', path: 'pages/home/home' },
        { name: 'tool-orders-page', path: 'pages/toolOrders/toolOrders' },
        { name: 'settings-page', path: 'pages/settings/settings' },
        { name: 'help-page', path: 'pages/help/help' },
        { name: 'order-page', path: 'pages/order/order' },
        { name: 'new-order-page', path: 'pages/newOrder/newOrder' }
    ],
    // Components - knockout components intended as parts of pages, a.k.a. components
    components: [
        { name: 'nav-bar', path: 'components/nav-bar/nav-bar' },
        { name: 'app', path: 'components/app/app' },
        { name: 'sidebar', path: 'components/sidebar/sidebar' },
        { name: 'wizard', path: 'components/wizard/wizard' }
    ]
});
