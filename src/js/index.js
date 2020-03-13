// import {outside, insideChina, summaryOutside, summaryChina} from "./test";

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////////// Smoth scrolling


$(document).ready(function(){
    $("#nav").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
            top = top - 150;
        $('body,html').animate({scrollTop: top}, 600);
    });
});


///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////////// Russia

///////////////////////////////
// Adding classes

let russiaInside = Array.from(document.querySelector('.tableRussia').children);

for(let i = 0; i < russiaInside.length; i++){
	// console.log(russiainsideChina[i].cells.first)
	
	document.querySelector('.tableRussia').rows[i].classList.add("table__row");
	document.querySelector('.tableRussia').rows[i].cells[0].classList.add( "paragraph", "paragraph__table", "paragraph__area" );
	document.querySelector('.tableRussia').rows[i].cells[1].classList.add( "paragraph", "paragraph__table", "paragraph__confirmed" );
	document.querySelector('.tableRussia').rows[i].cells[2].classList.add( "paragraph", "paragraph__table", "paragraph__died" );
	document.querySelector('.tableRussia').rows[i].cells[3].classList.add( "paragraph", "paragraph__table", "paragraph__crued" );
	
}


//////////////////////////////////
//// Summary Russia

let sumDiedRussia = 0, 
	sumConfirmedRussia = 0, 
	sumCruedRussia = 0;

for(let i = 0; i < russiaInside.length; i++){
	// console.log(russiainsideChina[i].cells.first)
	
	
	sumConfirmedRussia += +(document.querySelector('.tableRussia').rows[i].cells[1].innerHTML);
	sumDiedRussia += +(document.querySelector('.tableRussia').rows[i].cells[2].innerHTML);
	sumCruedRussia += +(document.querySelector('.tableRussia').rows[i].cells[3].innerHTML);
	
}

function summaryRussiaFunction() {

	let markup = ` 
		<div class="summaryRussia__card">
			<h3 class="heading-tertiary">Всего инфицировано</h3>
			<p class="paragraph__confirmed paragraph">${sumConfirmedRussia}</p>
		</div>
		<div class="summaryRussia__card">
			<h3 class="heading-tertiary">Умерло</h3>
			<p class="paragraph__died paragraph">${sumDiedRussia}</p>
		</div>	
		<div class="summaryRussia__card">
			<h3 class="heading-tertiary">Выздоровело</h3>
			<p class="paragraph__crued paragraph">${sumCruedRussia}</p>
		</div>
	`
	document.getElementById('summaryRussia').insertAdjacentHTML('afterbegin', markup);

}

summaryRussiaFunction();



////////////////////////////////////////////////////////////////////////////////////////


import {areaName, outsideName} from "./dictionary";

let mainData; 

$(document).ready(function(){
    $.post('./main.php', function(data) {
        mainData = data;
        
        // Summary China data
        
        let summaryDataIn = mainData.split('"summaryDataIn":');
        let SecondSummaryDataIn = summaryDataIn[1].split(',"summaryDataOut');
        let summaryChina = SecondSummaryDataIn[0];
        summaryChina = JSON.parse(summaryChina);
        
        
        // Inside China data 
        
        let chinaArray = mainData.split('"caseList":');
        let SecondChinaArray = chinaArray[1].split(',"caseOutsideList');
        let insideChina = SecondChinaArray[0];
        insideChina = JSON.parse(insideChina);
        
        
        // Outside Data
        
        let caseOutsideList = mainData.split('caseOutsideList":');
        let SecondCaseOutsideList = caseOutsideList[1].split(',"dataSource');
        let outside = SecondCaseOutsideList[0];
        outside = JSON.parse(outside);
        
        // summary Outside
        
        let summaryDataOut = mainData.split('"summaryDataOut":');
        let SecondSummaryDataOut = summaryDataOut[1].split(',"share');
        let summaryOutside = SecondSummaryDataOut[0];
        summaryOutside = JSON.parse(summaryOutside);
        
        
		////////////////////////////////////////////////////////////////////////////////////////
		// Delete all spinners

		$( ".spinner" ).remove();
		$( ".paragraph__update" ).remove();
		
		////////////////////////////////////////////////////////////////////////////////////////		


		for(let i = 0; i < insideChina.length; i++){
			
			insideChina[i].area = areaName[i];

			if(insideChina[i].died == "") {
				insideChina[i].died = "0";
			}

			let markup = `<tr class="table__row">
		        <td class="paragraph__area paragraph paragraph__table">${insideChina[i].area}</td>
		        <td class="paragraph__confirmedRelative paragraph paragraph__table">${insideChina[i].confirmedRelative}</td>
		        <td class="paragraph__confirmed paragraph paragraph__table">${insideChina[i].confirmed}</td>
		        <td class="paragraph__died paragraph paragraph__table">${insideChina[i].died} <br> (${(insideChina[i].died / insideChina[i].confirmed * 100).toFixed(1)}%)</td>
		        <td class="paragraph__crued paragraph paragraph__table">${insideChina[i].crued} <br> (${(insideChina[i].crued / insideChina[i].confirmed * 100).toFixed(1)}%)</td>
		    </tr>`
			document.getElementById('chinaTable').insertAdjacentHTML('afterbegin', markup);
		}


		for(let i = 0; i < outside.length; i++){
				
			for(let g = 0; g < outsideName.length; g++){
				if(outside[i].area == outsideName[g].cn) {
					outside[i].area = outsideName[g].rus;
					
				}
			}
			
		}

		function outsideFunction() {
		    outside.sort(function(a, b){return a.confirmed - b.confirmed});

		    for(let i = 0; i < outside.length; i++){
			
				// if(outsideName[i]){
				// 	outside[i].area = outsideName[i];
				// }
				if(outside[i].died == "") {
					outside[i].died = "0";
				}
				if(outside[i].area == "Россия") {
					outside[i].died = sumDiedRussia;
					outside[i].confirmed = sumConfirmedRussia;
					outside[i].crued = sumCruedRussia;
				}

				if(outside[i].confirmedRelative == undefined) {
					outside[i].confirmedRelative = "0";
				}

				let markup = `<tr class="table__row">
			        <td class="paragraph__area paragraph paragraph__table">${outside[i].area}</td>
			        <td class="paragraph__confirmedRelative paragraph paragraph__table">${outside[i].confirmedRelative}</td>
			        <td class="paragraph__confirmed paragraph paragraph__table">${outside[i].confirmed}</td>
			        <td class="paragraph__died paragraph paragraph__table">${outside[i].died} <br> (${(outside[i].died / outside[i].confirmed * 100).toFixed(1)}%)</td>
			        <td class="paragraph__crued paragraph paragraph__table">${outside[i].crued} <br> (${(outside[i].crued / outside[i].confirmed * 100).toFixed(1)}%)</td>
			    </tr>`
				document.getElementById('outsideTable').insertAdjacentHTML('afterbegin', markup);


				
			}

		}

		outsideFunction();


		// console.log(summaryChina.confirmed);

		///////////////////////////////////////////////////////
		///////////////////////////////////////////////////////


		function summaryChinaFunction() {

			let markup = ` 
				<div class="summaryChina__card">
					<h3 class="heading-tertiary">Больных сейчас</h3>
					<p class="paragraph__curConfirm paragraph">${summaryChina.curConfirm}</p>
					<p class="paragraph__curConfirmRelative paragraph">${summaryChina.curConfirmRelative}</p>
				</div>
				<div class="summaryChina__card">
					<h3 class="heading-tertiary">Подозрение</h3>
					<p class="paragraph__unconfirmed paragraph">${summaryChina.unconfirmed}</p>
					<p class="paragraph__unconfirmedRelative paragraph">+${summaryChina.unconfirmedRelative}</p>
				</div>
				<div class="summaryChina__card">
					<h3 class="heading-tertiary">В критическом состоянии</h3>
					<p class="paragraph__icu paragraph">${summaryChina.icu}</p>
					<p class="paragraph__icuRelative paragraph">${summaryChina.icuRelative}</p>
				</div>
				<div class="summaryChina__card">
					<h3 class="heading-tertiary">Всего инфицировано</h3>
					<p class="paragraph__confirmed paragraph">${summaryChina.confirmed}</p>
					<p class="paragraph__confirmedRelative paragraph">+${summaryChina.confirmedRelative}</p>
				</div>
				<div class="summaryChina__card">
					<h3 class="heading-tertiary">Выздоровело</h3>
					<p class="paragraph__crued paragraph">${summaryChina.cured}</p>
					<p class="paragraph__cruedRelative paragraph">+${summaryChina.curedRelative}</p>
				</div>
				<div class="summaryChina__card">
					<h3 class="heading-tertiary">Умерло</h3>
					<p class="paragraph__died paragraph">${summaryChina.died}</p>
					<p class="paragraph__diedRelative paragraph">+${summaryChina.diedRelative}</p>
				</div>	
			`
			document.getElementById('summaryChina').insertAdjacentHTML('afterbegin', markup);

		}

		summaryChinaFunction();

		///////////////////////////////////////////////////////
		///////////////////////////////////////////////////////


		function summaryOutChinaFunction() {

			let markup = ` 
				<div class="summaryOutside__card">
					<h3 class="heading-tertiary">Количество больных сейчас</h3>
					<p class="paragraph__curConfirm paragraph">${summaryOutside.curConfirm}</p>
				</div>
				<div class="summaryOutside__card">
					<h3 class="heading-tertiary">Всего инфицировано</h3>
					<p class="paragraph__confirmed paragraph">${summaryOutside.confirmed}</p>
				</div>
				<div class="summaryOutside__card">
					<h3 class="heading-tertiary">Умерло</h3>
					<p class="paragraph__died paragraph">${summaryOutside.died}</p>
				</div>	
				<div class="summaryOutside__card">
					<h3 class="heading-tertiary">Выздоровело</h3>
					<p class="paragraph__crued paragraph">${summaryOutside.cured}</p>
				</div>
			`
			document.getElementById('summaryOutside').insertAdjacentHTML('afterbegin', markup);

		}

		summaryOutChinaFunction();

		///////////////////////////////////////////////////////
		///////////////////////////////////////////////////////



		function summaryWorldFunction() {

			let markup = ` 
				<div class="summaryWorld__card">
					<h3 class="heading-tertiary">Больных сейчас</h3>
					<p class="paragraph__curConfirm paragraph">${+summaryOutside.curConfirm + +summaryChina.curConfirm}</p>
				</div>
				<div class="summaryWorld__card">
					<h3 class="heading-tertiary">Всего инфицировано</h3>
					<p class="paragraph__confirmed paragraph">${+summaryOutside.confirmed + +summaryChina.confirmed}</p>
				</div>
				<div class="summaryWorld__card">
					<h3 class="heading-tertiary">Умерло</h3>
					<p class="paragraph__died paragraph">${+summaryOutside.died + +summaryChina.died}</p>
				</div>	
				<div class="summaryWorld__card">
					<h3 class="heading-tertiary">Выздоровело</h3>
					<p class="paragraph__crued paragraph">${+summaryOutside.cured + +summaryChina.cured}</p>
				</div>
			`
			document.getElementById('summaryWorld').insertAdjacentHTML('afterbegin', markup);


			//////////////////////////////////
			//// Add image

			$('.img__img').css('display','inline-block');

		}

		summaryWorldFunction();




		


		




		//////////////////////////////////
		//// Time




		function time(){
			let Data, Year, Month, Day, Hour, Minutes, Seconds,fMonth, currentTime;
			// Вывод
			Data = new Date();
			Year = Data.getFullYear();
			Month = Data.getMonth();
			Day = Data.getDate();
			 
			// Преобразуем месяца
			switch (Month)
			{
			  case 0: fMonth="января"; break;
			  case 1: fMonth="февраля"; break;

			  case 2: fMonth="марта"; break;
			  case 3: fMonth="апреля"; break;
			  case 4: fMonth="мае"; break;
			  case 5: fMonth="июня"; break;
			  case 6: fMonth="июля"; break;
			  case 7: fMonth="августа"; break;
			  case 8: fMonth="сентября"; break;
			  case 9: fMonth="октября"; break;
			  case 10: fMonth="ноября"; break;
			  case 11: fMonth="декабря"; break;
			}
			Hour = ('0' + Data.getHours() ).slice(-2) ;
			Minutes = ('0' + Data.getMinutes() ).slice(-2) ;
			
			Seconds = ('0' + Data.getSeconds() ).slice(-2) ; 

			currentTime = `${Day} ${fMonth} ${Year}, ${Hour}:${Minutes}:${Seconds}` 

			let arrTime = Array.from(document.getElementsByClassName('time') );

			for(let i = 0; i < arrTime.length; i++){
				arrTime[i].insertAdjacentHTML('afterend', `<p class="paragraph paragraph__table my-b-normal u-center-text">Данные обновлены: ${currentTime}</p>`);
			}
		}
		time()
		// Вывод

    });
});

