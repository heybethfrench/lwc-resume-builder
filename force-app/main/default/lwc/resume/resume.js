import { LightningElement, track } from 'lwc';
import getEmployers from '@salesforce/apex/resumeHelper.getEmployers';

export default class Resume extends LightningElement {

    @track experience;
    @track error;
    @track workHx;
    @track volunteerHx;
    @track educationHx;

    connectedCallback(){
        getEmployers()
        .then(result => {
            this.experience = result;
            this.workHx = result.filter(this.filterWorkHx);
            this.volunteerHx = result.filter(this.filterVolunteerHx);
            this.educationHx = result.filter(this.filterEducationHx);
            this.error = undefined;    
        })
        .catch(error => {
            this.error = error;
            this.experience = undefined;
            this.workHx = undefined;
            this.volunteerHx = undefined;
            this.educationHx = undefined;
        });
    }

    filterWorkHx(item){
        return item.Type == "Employer";
    }

    filterVolunteerHx(item){
        return item.Type == "Volunteer Organization";
    }

    filterEducationHx(item){
        return item.Type == "Educational Institution";
    }

}