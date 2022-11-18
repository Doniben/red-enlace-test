import { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState('');
  const [ paises, setPaises] = useState([]);
  const url = "https://test.gapper.com.mx/apigapper/sandbox/token";
  const catalogURL = "https://test.gapper.com.mx/apigapper/sandbox/catalogoPaisesTest";

  let formData = {
    grant_type: "password",
    username: "TEST",
    password: "TEST",
  };

  // function
  const encodeFormData = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const tokenFetch = async () => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: encodeFormData(formData),
    }).catch(
      console.log("error")
    );
    const resJSON = await response.json();
    const token = resJSON.access_token;
    setToken(token);

    let appHeaders = new Headers();
    appHeaders.append("Authorization", `Bearer ${token}`);

    let requestOptions = {
      method: "GET",
      headers: appHeaders,
    };

    const res = await fetch(catalogURL, requestOptions).catch(
      console.log("error")
    );
    const data = await res.json();
    setPaises(data.Paises)
  };

  useEffect(() => {
    tokenFetch();
  }, [ ]);

  return (
    <div className="container-fluid bg-light p-4">
      <h2 className="text-danger text-center">Prueba Red Enlace</h2>
      <div className="row d-flex justify-content-center">
        <div className="col-8">
          <table className="table table-hover col-8">
            <thead>
              <tr className="col-8">
                <th scope="col"><h4 className="text-info">#</h4></th>
                <th scope="col text-info"><h4 className="text-info">País</h4></th>
              </tr>
            </thead>
            <tbody>
              {
                !paises || !token ? 'Cargando...' :
                paises.map( (pais) => (
                  <tr>
                    <th scope="row">{ pais.Id }</th>
                    <td>{ pais.Nombre }</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}

export default App;
