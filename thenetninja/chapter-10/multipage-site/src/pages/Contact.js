import { useLocation } from 'react-router-dom'

export default function Contact() {
  const queryString = useLocation().search

  const queryParams = new URLSearchParams(queryString)
  const name = queryParams.get("name")
  //?name=mario in url

  return (
    <div>
      <h2>Hey {name}, Contact us</h2>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
        Molestias aut, repellat ipsum facere voluptate dicta obcaecati 
        deserunt nobis suscipit eaque?</p>
    </div>
  )
}
