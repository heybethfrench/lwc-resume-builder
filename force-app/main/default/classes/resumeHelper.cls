public without sharing class resumeHelper {
    @AuraEnabled
    public static List<Account> getEmployers() {
        List<Account> workHistory = new List<Account>();
        workHistory = [SELECT Id, 
                              Name, 
                              Type, 
                              (SELECT Id, Name, Start_Date__c, End_Date__c, Description__c 
                               FROM Work_History__r) 
                      FROM Account 
                      ORDER BY Sequence__c DESC];
        return workHistory;
    }
}
