class UserInfo { 
    constructor(name, occupation){ 
        this._name = document.querySelector(name); 
        this._occupation = document.querySelector(occupation); 
    } 
 
    getUserInfo(){ 
        return this.userInfo = [this._name.textContent, this._occupation.textContent]; 
    } 
 
    setUserInfo(name, occupation, avatar) { 
            this._name.textContent = name; 
            this._occupation.textContent = occupation; 
    } 
} 

export default UserInfo;