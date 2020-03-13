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
        console.log(outside)
        // summary Outside
        
        let summaryDataOut = mainData.split('"summaryDataOut":');
        let SecondSummaryDataOut = summaryDataOut[1].split(',"share');
        let summaryOutside = SecondSummaryDataOut[0];
        summaryOutside = JSON.parse(summaryOutside);
        
        
         


    });
});