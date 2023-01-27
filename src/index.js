var jqi18nLoad = function (language){
    let language_i18n = language.replace(/-/i,'_');
    let props = {
        titles: ['dashboard', 'configuration']
    }
    console.log('language: ', language)
    $.i18n.properties({
        name: 'description',
        path: 'settings/i18n/',
        mode: 'both',
        language_i18n,
        async: true,
        callback: function() {
            $.i18n.prop('title')
            console.log(title)
        }
    });
}

console.log($.fn.jquery)

$(document).ready(function () {
    jqi18nLoad(navigator.language);
})
