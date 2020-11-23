$(function(){
    function get2digits(num){
        return ('0' + num).slice(-2);
    }

    function getDate(dateObj){
        if(dateObj instanceof Date){
            return dateObj.getFullYear() + '-' + get2digits(dateObj.getMonth()+1) + '-' + get2digits(dateObj.getDate());
        }
    }

    function getTime(dateObj){
        if(dateObj instanceof Date){
            return get2digits(dateObj.getHours()) + ':' + get2digits(dateObj.getMinutes()) + ':' + get2digits(dateObj.getSeconds());
        }
    }
    // 날짜 데이터가 있는 element를 찾아서 해당 데이터를 '년-월-일'의 형태로 변환하여 element의 text로 넣음
    function convertDate(){
        $('.createdAt').each(function(){
            var dateString = $(this).attr('date');

            if(dateString){
                var date = new Date(dateString);
                $(this).text(getDate(date));
            }
        });
    }
    // 날짜 데이터가 있는 element를 찾아서 해당 데이터를 '년-월-일 시:분:초'의 형태로 변환하여 element의 text로 넣음
    function convertDateTime(){
        $('.postInfoDate').each(function(){
            var dateString = $(this).attr('dateTime');

            if(dateString){
                var date = new Date(dateString);
                $(this).text(getDate(date) + ' ' + getTime(date));
            }
        });
    }

    convertDate();
    convertDateTime();
});