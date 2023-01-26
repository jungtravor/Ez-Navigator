function jqi18nLoad(language){
    let props = {
        titles: ['dashboard', 'configuration']
    }
    jQuery.i18n.properties({
        name: 'description', 
        path: 'settings/i18n/', 
        mode: 'both',
        language,
        async: true,
        callback: function() {
            jQuery.i18n.prop('titles_dashboard')
            alert(titles_dashboard)
        }
    });
}


$(document).ready(function () {
    jqi18nLoad(navigator.language);
})
