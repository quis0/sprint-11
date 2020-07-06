class UserInfo {
  constructor(nameField, aboutField, photoField, api) {
    this.name = null;
    this.about = null;
    this.userId = null;
    this._nameField = nameField;
    this._aboutField = aboutField;
    this._photoField = photoField;
    this.api = api;
  }
  setUserInfo(name, about) {
    this.name = name;
    this.about = about;
  }
  updateUserInfo() {
    this.api.sendUserInfo(this.name, this.about).then(() => {
        this._nameField.textContent = this.name;
        this._aboutField.textContent = this.about;

    }).catch(err => console.log(err));
  }
  render() {
    this.api.getUserInfo().then((res) => {
      this.name = res.name;
      this.about = res.about;
      this.userId = res._id;
      this._nameField.textContent = res.name;
      this._aboutField.textContent = res.about;
      this._photoField.setAttribute('style', `background-image: url('${res.avatar}')`);
    }).catch(err => console.log(err));
  }
  getName() {
    return this.name;
  }
  getAbout() {
    return this.about;
  }
  getUserId() {
    return this.userId;
  }
}
