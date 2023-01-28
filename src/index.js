function jqi18nLoad(language){
    let language_i18n = language.replace(/-/i,'_').substring(0, 2)
    console.log('language: ', language_i18n)
    $.i18n.properties({
        name: 'description',
        path: 'settings/i18n/',
        mode: 'both',
        language_i18n,
        async: true,
        callback: function() {
            $("[data-locale]").each(function () {
                $(this).html($.i18n.prop($(this).data("locale")));
            });
        }
    });
}

$(document).ready(function () {
    // jqi18nLoad('en-US');
    jqi18nLoad(navigator.language);
})
