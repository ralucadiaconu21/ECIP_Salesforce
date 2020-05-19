public with sharing class SendRequestToHeroku {


    @AuraEnabled
    public static String createSession(){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://backend-ecip.herokuapp.com/message/create-session');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        Map<String, Object> result = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
        return (String)result.get('session_id');

    }

    @AuraEnabled
    public static String sendMessage(Map<String,String> body){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://backend-ecip.herokuapp.com/message/send');
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json');
        request.setBody(JSON.serialize(body));
        HttpResponse response = http.send(request);
        return response.getBody();
    }


}