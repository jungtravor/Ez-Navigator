function jqi18nLoad(language){
    let props = {
        titles: ['dashboard', 'configuration']
    }
    $.i18n.properties({
        name: 'description',
        path: 'settings/i18n/',
        mode: 'both',
        language,
        async: true,
        callback: function() {
            console.log($(this).data("locale"))
            $(this).html($.i18n.prop($(this).data("locale")));
            $.i18n.prop('titles_dashboard')
        }
    });
}


$(document).ready(function () {
    jqi18nLoad(navigator.language);
})
