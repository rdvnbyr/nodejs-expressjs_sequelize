exports.page404 = (req, res, next) => {
    res.status(404).render(
        'page404', 
        { 
            pageTitle: 404,
            text: 'Page Not Found!',
            path: '/404'
        }
    );
    // res.status(404).sendFile(path.join(__dirname, '../', 'views', 'page404.html'));
};