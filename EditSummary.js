/* 한국어 위키백과 미디어위키:Gadget-editsummary.js를 약간 수정함 */
function esEditSummary() {
    const wgAction = mw.config.get('wgAction');
    if (!(wgAction == 'edit' || wgAction == 'submit')) {
        return;
    }
    // 상용구를 사용할 수 있는지 여부
    const wpSummary = document.getElementById('wpSummary');
    if (!wpSummary || (wpSummary.form.wpSection && wpSummary.form.wpSection.value == 'new')) return;

    // 컨테이너
    wpSummaryButtons = new OO.ui.ButtonGroupWidget({ id: "wpSummaryButtons" });
    wpSummaryButtons.$element.css({ "margin-bottom": "1em" });
    $("#wpSummaryLabel .oo-ui-fieldLayout-header").after(wpSummaryButtons.$element);

    // 버튼들 추가
    const ButtonElements = [];
    for (const esButtonElement of esEditSummaries) {
        const btnElement = new OO.ui.ButtonWidget({
            data: 1,
            label: esButtonElement[0],
            title: esButtonElement[2]

        }).on('click',
            () => {
                esInsertSummary(esButtonElement[1], esButtonElement[3], esButtonElement[4]);
            });

        ButtonElements.push(btnElement);
    }

    wpSummaryButtons.addItems(ButtonElements);
}

function esInsertSummary(text, isMinor, clear) {
    const wpSummary = document.getElementById('wpSummary');
    if (isMinor !== undefined) { $('#wpMinoredit').prop('checked', isMinor, clear); }
    if (clear == 1) {
        wpSummary.value = text;
        return;
    }
    if (wpSummary.value.includes(text)) return;
    if (wpSummary.value.match(/[^,; \/]$/)) wpSummary.value += ',';
    if (wpSummary.value.match(/[^ ]$/)) wpSummary.value += ' ';
    wpSummary.value += text;
}

jQuery(document).ready(esEditSummary);
