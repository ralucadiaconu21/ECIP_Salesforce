import { LightningElement, track } from "lwc";
import createSession from "@salesforce/apex/SendRequestToHeroku.createSession";
import sendMessage from "@salesforce/apex/SendRequestToHeroku.sendMessage";
export default class ChatComponent extends LightningElement {
  @track messageList = [];

  @track isSendDisabled = true;

  _replyText;
  _sessionId;

  connectedCallback() {
    createSession()
      .then(response => {
        console.log("in response ", response);
        this._sessionId = response;
      })
      .catch(error => {
        console.log("errrrrrorrr create session ", error);
      });
  }

  handleOnChange = event => {
    if (event.target.value || event.target.value !== "") {
      this.isSendDisabled = false;
      this._replyText = event.target.value;
    } else {
      this.isSendDisabled = true;
    }
  };

  handleOnSend = () => {
    this.messageList.push({
      outbound: true,
      content: this._replyText
    });
    sendMessage({
      body: {
        message: this._replyText,
        sessionId: this._sessionId
      }
    })
      .then(response => {
        const parsedResponse = JSON.parse(response);
        parsedResponse.message.forEach(message => {
          this.messageList.push({
            outbound: false,
            content: message.text
          });
        });
      })
      .catch(error => {});
  };
}