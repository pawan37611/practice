import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { pics: [] };
    this.picArray = [];
    this.previewFile = this.previewFile.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  previewFile(e) {
    var file = e.target.files[0]; //sames as here
    var reader = new FileReader();

    reader.onloadend = function () {
      let pic = { "url": "", val: "0" };
      pic.url = reader.result;
      this.picArray.push(pic);
      this.setState({ pics: this.picArray });
}.bind(this);

    if (file) {
      reader.readAsDataURL(file); //reads the data as a URL
    }
  }
   
  setValue(event) {
    var index = event.target.selectedIndex;
    var key = event.target.getAttribute('data-i');
    var prev = event.target.getAttribute('data-prev');

    if (!this.picArray.find((pic, index) => { return pic.val == event.target.value && index != key })) {
      event.target.setAttribute('data-prev', event.target.value);
      this.picArray[key].val = event.target.value;

    }
    else {
      alert(`Sorry, You have already assigned some other dress to ${event.target.options[event.target.selectedIndex].text}`)
      event.target.value = prev;
    }

  }

  render() {

    return (
      <div>
        <p>Please Select Your Dress For the Day</p>
        <input type="file" onChange={(e)=>{this.previewFile(e)}}/><br />
      <ul>{this.state.pics ? this.state.pics.map((pic, index) => {
          return (
            <li key={index} >
              <img src={pic.url}  height="200" alt="Image preview..." />
              <select data-i={index} data-prev={pic.val} onChange={this.setValue} >
                <option selected="selected" value="0">Please Select a Day</option>
                <option value="1" >Monday</option>
                <option value="2" >Tuesday</option>
                <option value="3">Wednesday</option>
                <option value="4"  >Thursday</option>
                <option value="5" >Friday</option>
                <option value="6" >Saturday</option>
                <option value="7">Sunday</option>
              </select>
            </li>)
        }
        ) : ""}</ul>
      </div>
    );
  }
}

export default App;
