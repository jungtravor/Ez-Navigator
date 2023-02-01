/**
 * 输出 HTML 元素
 * 
 * @param {string}  tag         HTML 元素标签
 * @param {object}  params      HTML 元素属性
 * @param {any}     content     HTML 内容
 * @param {string}  mode        输出格式：仅标签头（head）、标签头及属性（start）、去除标签尾（toEnd）、完整元素（full）
 * @returns 
 */
function gn(tag, params, content = '', mode = 'full') {

    if (mode == 'end') return `</${tag}>`

    let paramStr = ''
    for (let key in params) paramStr += ` ${key}="${params[key]}"`

    if (mode == 'start') return `<${tag}${paramStr}>`
    if (mode == 'toEnd') return `<${tag}${paramStr}>${content}`
    return `<${tag}${paramStr}>${content}</${tag}>`

}

/**
 * 向 .container 元素尾部追加字符串内容
 * 
 * @param {string} content 
 */
function wrs(content) { $('.container').append(content) }


/**
 * 向 .container 元素尾部追加 HTML 内容
 * 
 * @param {string}  tag         HTML 元素标签
 * @param {object}  params      HTML 元素属性
 * @param {any}     content     HTML 内容
 * @param {string}  mode        输出格式：仅标签头（head）、标签头及属性（start）、去除标签尾（toEnd）、完整元素（full）
 */
function wrg(tag, params, content, mode) { $('.container').append(gn(tag, params, content, mode)) }

/**
 * 加载 HTML 字符串内容
 * 
 * @param {string} language 
 */
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
            document.title = $.i18n.prop('title')
            $('.title').html($.i18n.prop('title'))
            $('.description').html($.i18n.prop('description'))
            $("[data-locale]").each(function () {
                $(this).html($.i18n.prop($(this).data("locale")));
            });
        }
    });
}

function cardy(objCard) {
    let { color, gName, cName, linkStr, navStr} = objCard
    let text = `
    <div class="card col-12 col-md-6 col-xl-4">
        <div class="card-body" style="background-color: ${color}">
            <div class="card-body-header">
                <h5 data-locale="${gName}_${cName}_title" class="card-title"></h5>
                <p data-locale="${gName}_${cName}_text" class="card-text"></p>
                ${linkStr}
            </div>
            <div class="card-body-footer">${navStr}</div>
        </div>
    </div>
    `
    return text
}

/**
 * 加载卡片内容
 * 
 * @param {object}  settings
 */
function loadCards(settings){
    if (!settings) {
        return
    }
    try {
        settings.groups.forEach(element => {
            let gName = element.name
            wrg('h3', {}, ' - ' + gn('span', { "data-locale": `${gName}_title`}))   // 组名称
            // 准备组内容
            let groupContent = ''
            element.cards.forEach(card => {
                let { color = 'black' } = card
                let cName = card.name
                // 卡片参考链接
                let linkStr = ''
                card.links.forEach(link => {
                    linkStr += gn(
                        'a',
                        {
                            "data-locale": `${gName}_${cName}_link_${link.name}`,
                            href: link.url,
                            target: '_blank'
                        }
                    )
                })
                // 卡片导航按钮
                let navStr = ''
                if (card.entries) card.entries.forEach(entry => {
                    navStr += gn(
                        'a',
                        {
                            "data-locale": `${gName}_${cName}_entries_${entry.name}`,
                            href: entry.url,
                            target: '_blank',
                            class: 'btn btn-link'
                        }
                    )
                })
                // 卡片生成数据
                let objCard = { color, gName, cName, linkStr, navStr }
                // 写入卡片
                groupContent += cardy(objCard)
            })
            // 写入组内容
            wrg('div', { class: 'row' }, groupContent)
        });
        jqi18nLoad(navigator.language)
    } catch (e) {
        console.error(e)
        $('.title').html('加载失败')
        $('.description').html('未能加载配置文件，请检查控制台日志。')
    }
}

/**
 * 初始化
 */
$(document).ready(function () {
    $.ajax({
        url:"./settings/entries.json",
        type:"get",
        dataType:"json",
        success: (res) => loadCards(res),
        error: (XMLHttpRequest) => {
            loadCards(false)
            console.log(XMLHttpRequest.status)
        },
    })
})
