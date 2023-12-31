/* 한국어 위키백과 미디어위키:Gadget-editsummary.js를 약간 수정함 */
function esEditSummary() {
    var wgAction = mw.config.get('wgAction');
    if (wgAction == 'edit' || wgAction == 'submit') {
    	
    	// 상용구를 사용할 수 있는지 여부
        var wpSummary = document.getElementById('wpSummary');
        if (!wpSummary || (wpSummary.form.wpSection && wpSummary.form.wpSection.value == 'new')) return;
        
        // 컨테이너
        wpSummaryButtons = new OO.ui.ButtonGroupWidget({id: "wpSummaryButtons"});
        wpSummaryButtons.$element.css({"margin-bottom": "1em"});
        $("#wpSummaryLabel .oo-ui-fieldLayout-header").after(wpSummaryButtons.$element);
        
        // 버튼들 추가
        let ButtonElements = [];
		for (let id = 0; id < esEditSummaries.length; id++) {
			var btnElement = new OO.ui.ButtonWidget({
        		data: 1,
        		label: esEditSummaries[id][0],
        		title: esEditSummaries[id][2]
        		
			}).on('click',
				() => { esInsertSummary (esEditSummaries[id][1], esEditSummaries[id][3], esEditSummaries[id][4]);
			});
			
			ButtonElements.push(btnElement);
		}
		
		wpSummaryButtons.addItems(ButtonElements);
    }
}

function esInsertSummary(text, isMinor, clear) {
    var wpSummary = document.getElementById('wpSummary');
    if (isMinor !== undefined) { $('#wpMinoredit').prop('checked', isMinor, clear); }
    if (clear == 1) {
        wpSummary.value = text;
        return;
    }
    if (wpSummary.value.indexOf(text) != -1) return;
    if (wpSummary.value.match(/[^,; \/]$/)) wpSummary.value += ',';
    if (wpSummary.value.match(/[^ ]$/)) wpSummary.value += ' ';
    wpSummary.value += text;
}

jQuery(document).ready(esEditSummary);
