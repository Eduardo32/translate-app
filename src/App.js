import React, { Component } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';

import './App.css';

import api from './services/api';

class App extends Component {
  constructor() {
    super();
    this.state = {
      options: [
        {
          cod: 'de',
          lang: 'Alemão'
        },
        {
          cod: 'es',
          lang: 'Espanhol'
        },
        {
          cod: 'en',
          lang: 'Inglês'
        },
        {
          cod: 'pt',
          lang: 'Português'
        },
      ],
      langFrom: '',
      langTo: '',
      text: '',
      textTranslated: '',
      langs: {},
    }
  }

  async componentDidMount() {
    const key = 'trnsl.1.1.20191119T204509Z.6e32edd1e93852e6.f2292421af3723c96aed48a7f6d9f05960884169';

    const ui = 'pt'

    const response = await api.get('/getLangs', {
      params: {
        key,
        ui
      }
    })

    this.setState({ langs: response.data.langs });
  }

  translate = async (e) => {
    const { text, langFrom, langTo } = this.state;

    const key = 'trnsl.1.1.20191119T204509Z.6e32edd1e93852e6.f2292421af3723c96aed48a7f6d9f05960884169';

    e.preventDefault();

    const response = await api.get('/translate', {
      params: {
        key,
        text,
        lang: langFrom !== '' ? langFrom+'-'+langTo : langTo
      }
    })

    this.setState({ textTranslated: response.data.text });
  };

  handleTextChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSelection = e => {
    const select = e.target.name;

    if (select === 'langFrom') {
      this.setState({ langFrom: e.target.value })
    } else {
      this.setState({ langTo: e.target.value })
    }
  }

  changeLanguages = () => {
    const { langFrom, langTo } = this.state;
    
    this.setState({ langFrom: langTo, langTo: langFrom }); 
  }

  render() {
    const { text, textTranslated, langFrom, langTo, langs } = this.state;
    return (
      <div className="container">
        <form onSubmit={this.translate}>
          <div>
            {/* <input className="autoComplete" list="langsFrom" name="langFrom" onChange={this.handleSelection} value={langFrom} />
            <datalist id="langsFrom">
              <option value="">Reconhecer</option>
              {Object.keys(langs).map(key => (
                <option key={key} value={key.toUpperCase()}>{langs[key]}</option>
              ))}
            </datalist> */}
            <select name="langFrom" onChange={this.handleSelection} value={langFrom}>
              <option value="">Reconhecer</option>
              {Object.keys(langs).map(key => (
                <option key={key} value={key}>{langs[key]}</option>
              ))}
            </select>
            <button type="button" onClick={this.changeLanguages}>
              <FaExchangeAlt />
            </button>
            <select name="langTo" onChange={this.handleSelection} value={langTo} required>
              <option value=""></option>
              {Object.keys(langs).map(key => (
                <option key={key} value={key}>{langs[key]}</option>
              ))}
            </select>
            <button type="submit">Traduzir</button>
          </div>
          <textarea value={text} onChange={this.handleTextChange} required></textarea>
        </form>
        <p>{textTranslated}</p>
      </div>
    );
  }
}

export default App;
