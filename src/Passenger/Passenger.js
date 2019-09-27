import React, {Component} from 'react';
import {Field, Form, Formik} from 'formik';
import {Button} from "react-bootstrap";
import axios from "axios";
import {API_URL} from "../constants";
import queryString from 'querystring';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

class Passenger extends Component {
    constructor(props) {
        super(props);
        this.state = {flightNo: ""};
    }

    componentDidMount() {
        this.setState({flightNo: queryString.parse(this.props.location.search, {ignoreQueryPrefix: true})['?flightNo']});
    }

    handleSubmit = (values, actions) => {
        console.log(this.props);
        const payload = {
            "flightNo": this.state.flightNo,
            "firstName": values.firstName,
            "lastName": values.lastName,
            "passportNo": values.passport,
            "street": values.street,
            "city": values.city,
            "countryCode": values.country,
            "phone": values.phone
        };

        const {getAccessToken} = this.props.auth;
        const headers = {headers: {Authorization: `Bearer ${getAccessToken()}`}};

        axios.post(`${API_URL}/passengers`, payload, headers)
            .then(response => console.log("Great success"))
            .catch(error => ToastsStore.error(((error.response || {}).data || {}).message));

        actions.setSubmitting(false);
    };

    render() {
        return (
            <div className={"container"}>
                <button onClick={() => {
                    console.log(this.props.auth.getIdToken());
                }}>
                    props
                </button>
                <ToastsContainer position={ToastsContainerPosition.TOP_RIGHT} store={ToastsStore}/>
                <h1>Passenger details</h1>
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        passport: "",
                        street: "",
                        city: "",
                        country: "",
                        phone: "",
                        flightNo: ""
                    }}
                    onSubmit={this.handleSubmit}
                    render={({errors, status, touched, isSubmitting}) => (
                        <Form>
                            <label style={{display: 'block'}}>
                                First name
                            </label>
                            <Field
                                type="text"
                                name="firstName"
                                placeholder="first name"
                                style={{display: 'block', padding: ".5rem", margin: ".5rem"}}
                            />
                            <label style={{display: 'block'}}>
                                Last name
                            </label>
                            <Field
                                type="text"
                                name="lastName"
                                placeholder="last name"
                                style={{display: 'block', padding: ".5rem", margin: ".5rem"}}
                            />
                            <label style={{display: 'block'}}>
                                Passport number
                            </label>
                            <Field
                                type="text"
                                name="passport"
                                placeholder="passport"
                                style={{display: 'block', padding: ".5rem", margin: ".5rem"}}
                            />
                            <label style={{display: 'block'}}>
                                Street
                            </label>
                            <Field
                                type="text"
                                name="street"
                                placeholder="street"
                                style={{display: 'block', padding: ".5rem", margin: ".5rem"}}
                            />
                            <label style={{display: 'block'}}>
                                City
                            </label>
                            <Field
                                type="text"
                                name="city"
                                placeholder="city"
                                style={{display: 'block', padding: ".5rem", margin: ".5rem"}}
                            />
                            <label style={{display: 'block'}}>
                                Country code
                            </label>
                            <Field
                                type="text"
                                name="country"
                                placeholder="country code"
                                style={{display: 'block', padding: ".5rem", margin: ".5rem"}}
                            />
                            <label style={{display: 'block'}}>
                                Phone number
                            </label>
                            <Field
                                type="text"
                                name="phone"
                                placeholder="phone number"
                                style={{display: 'block', padding: ".5rem", margin: ".5rem"}}
                            />
                            <label style={{display: 'block'}}>
                                Flight number
                            </label>
                            <Field
                                type="text"
                                name="flightNo"
                                value={this.state.flightNo}
                                disabled={true}
                                style={{display: 'block', padding: ".5rem", margin: ".5rem"}}
                            />
                            <Button
                                bsStyle="primary"
                                className="btn-margin"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Submit
                            </Button>
                        </Form>
                    )}
                />
            </div>
        );
    }
}

export default Passenger;