const messages = [
  {
    text: "Hi !",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];
module.exports = {
  displayMessage: (req, res) => {
    res.render("index", { title: "Mini Messageboard", messages: messages });
  },
  addNewMessage: (req, res) => {
    res.render("form");
  },
  postNewMessage: (req, res) => {
    const messageText = req.body.messageText;
    const messageUser = req.body.messageUser;
    messages.push({ text: messageText, user: messageUser, added: new Date() });
    res.redirect("/");
  },
  showMessageDetails: (req, res) => {
    const user = req.params.user;
    res.render("detail", { messages: messages, user: user });
  },
};
