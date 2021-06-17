export default class UserInfo { 
    constructor({nameSelector, jobSelector}){ 
        this._name = nameSelector; 
        this._occupation = jobSelector; 
    } 
 
    getUserInfo(){ 
        return this.userInfo = [this._name.textContent, this._occupation.textContent]; 
    } 
 
    setUserInfo(name, occupation,) { 
            this._name.textContent = name; 
            this._occupation.textContent = occupation; 
    } 
};