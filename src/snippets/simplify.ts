interface Message {
  user: User;
  deliveredTime: number;
}
interface User {
  id: string;
  type: "Admin" | "User";
}
function send(message: Message) {
  console.log(message);
}
const user: User = { id: "123", type: "User" };
const message: Message = { user: user, deliveredTime: 1230 };
const currentUser = { id: "123", type: "User" };

// Yuck

if (
  (message.user.id === currentUser.id &&
    (!message.deliveredTime ||
      (Date.now() as number) - message.deliveredTime < 3000)) ||
  currentUser.type === "Admin"
) {
  send(message);
}

// Nice

const userIsAuthor = message.user.id === currentUser.id;
const userIsRecent =
  !message.deliveredTime ||
  (Date.now() as number) - message.deliveredTime < 30000;
const userIsAdmin = currentUser.type === "Admin";

if ((userIsAuthor && userIsRecent) || userIsAdmin) {
  send(message);
}
