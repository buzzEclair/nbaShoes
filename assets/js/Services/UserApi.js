import Axios from "axios"

function getUser(email)
{
  return Axios
    .get('http://127.0.0.1:8000/api/users?email='+ email)
    .then(response => response.data['hydra:member'][0])
}

export default{
  getUser,
}