import { useState } from 'react';
import { CheckoutFormAddressInput } from './CheckoutAddress';
import { Country, State } from 'country-state-city';
import { useMask } from '@react-input/mask';


export function CheckoutForm() {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(country);

  const inputCEPRef = useMask({
    mask: '_____-___',
    replacement: { _: /\d/ },
  });

  const selectElement = document.querySelector("#state") as HTMLSelectElement;
  country && console.log(state)

  return (
    <div className="row g-3">
      <CheckoutFormAddressInput
        size="col-sm-6"
        id="firstName"
        type="text"
        label="Nome"
      />
      <CheckoutFormAddressInput
        size="col-sm-6"
        id="lastName"
        type="text"
        label="Sobrenome"
      />
      <CheckoutFormAddressInput
        size="col-sm-12"
        id="username"
        type="text"
        label="Nome de usuário"
        errorMessage="Por favor, insira o nome de usuário."
        username
      />
      <CheckoutFormAddressInput
        size="col-sm-12"
        id="email"
        placeholder="user@example.com"
        type="email"
        label="E-mail"
        errorMessage="Por favor, insira um endereço de e-mail válido para atualizações de envio."
      />
      <CheckoutFormAddressInput
        size="col-sm-12"
        id="address"
        placeholder="Rua Principal, 1234"
        type="text"
        label="Endereço"
        errorMessage="Por favor, insira seu endereço de envio."
      />
      <CheckoutFormAddressInput
        size="col-sm-12"
        id="address2"
        placeholder="Apartamento, Casa..."
        type="text"
        label="Complemento"
        errorMessage="Por favor, insira complementos do seu endereço de envio."
      />

      <CheckoutFormAddressInput
        size="col-md-5"
        id="country"
        type="select"
        label="País"
        options={countries.map((country, index) => (
          <option key={index} value={country.isoCode}>
            {country.name}
          </option>
        ))}
        onChange={(e) => {
          setCountry(e.target.value), setState(""), (selectElement.value = "");
        }}
      />

      <CheckoutFormAddressInput
        size="col-md-4"
        id="state"
        type="select"
        label="Estado"
        disabled={states.length === 0}
        options={states.map((state, index) => (
          <option key={index} value={state.name}>
            {state.name}
          </option>
        ))}
        onChange={(e) => {
            setState(e.target.value)
          }}
      />

      <CheckoutFormAddressInput
        size="col-md-3"
        id="zip"
        type="text"
        label="CEP"
        placeholder="12345-678"
        errorMessage="CEP é obrigatório."
        ref={inputCEPRef}
      />
    </div>
  );
}
