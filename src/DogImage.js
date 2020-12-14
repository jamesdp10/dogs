import React from 'react';

export class DogImage extends React.Component {
    state = {dogPics: [], fivePics: [], breeds: [], selectedBreed: 'collie'};
    
    componentDidMount() {
        this.fetchBreeds();
    }

    selectDog = (e) => {
        this.setState({selectedBreed: e.target.value});
    }
    
    fetchDog = () => {
            let url = "https://dog.ceo/api/breed/" + this.state.selectedBreed + "/images";
            fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw Error("Error fetching dog");
                }
                return response.json()
            .then(allData => {
                this.setState({dogPics: allData.message, fivePics: this.pickFive()});
                })
            .catch(err => {
                throw Error(err.message);
                });
            })
    }
    
    pickFive = () => {
        const copyAllPics = [...this.state.dogPics];
        const copyFivePics = [];
        for (let i=0; i<5; i++) {
            if (copyAllPics.length>5-i) {
                let randomIndex = Math.floor(Math.random()*copyAllPics.length);
                copyFivePics.push(copyAllPics[randomIndex]);
                copyAllPics.splice(randomIndex, 1);
            }
        }
        return copyFivePics;
    }

    fetchBreeds = () => {
        fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => {
            if (!response.ok) {
                throw Error("Error fetching dog");
            }
            return response.json()
        .then(allData => {
            this.setState({breeds: Object.keys(allData.message)});
            return '';
            })
        .catch(err => {
            throw Error(err.message);
            });
        })
    }

    render() {
        return (
            <div className="dogImage">
                <select style={{fontSize: "large"}} onChange={this.selectDog}><option value="" disabled selected>Select breed</option>{this.state.breeds.map((x,y) => <option key={y}>{x}</option>)}</select>
                <button style={{fontSize: "large"}} onClick={this.fetchDog}>Fetch!</button>
                <br />
                <div>{this.state.fivePics.map(pic => <img src={pic} />)}</div>
            </div>
                
                
        )
    }


}

  export default DogImage;