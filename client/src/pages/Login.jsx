import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export function Login() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const { target } = event;
    const formData = new FormData(target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  }

  return <div>In register</div>;
}

const Field = styled.input`
  
`
