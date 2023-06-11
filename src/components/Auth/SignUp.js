'use client';

import {useState} from 'react';
import cn from 'classnames';
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';

import {useAuth, VIEWS} from 'src/components/Auth/AuthProvider';
import supabase from 'src/lib/supabase-browser';

const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});

const SignUp = () => {
    const {setView} = useAuth();
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    async function signUp(formData) {
        const {error} = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
        });

        if (error) {
            setErrorMsg(error.message);
        } else {
            setSuccessMsg('Success! Please check your email for further instructions.');
        }
    }

    return (
        <section className={"flex-center"}>
            <div className="card-container">
                <h3>Create Account</h3>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={SignUpSchema}
                    onSubmit={signUp}
                >
                    {({errors, touched}) => (
                        <Form className={"column w-full"}>
                            <div className={"column gap-1 w-full"}>
                                <label htmlFor={"email"}>E-Mail</label>
                                <Field
                                    className={cn('input w-full', errors.email && touched.email && 'border-red-600')}
                                    name="email"
                                    type="email"
                                    placeholder={"you@example.com"}
                                />
                                {errors.email && touched.email ? (
                                    <div className={"text-red-600"}>{errors.email}</div>) : null}
                            </div>
                            <div className={"column gap-1 w-full"}>
                                <label htmlFor={"password"}>Password</label>
                                <Field
                                    className={cn('input w-full', errors.password && touched.password && 'border-red-600')}
                                    name="password"
                                    type="password"
                                />
                                {errors.password && touched.password ? (
                                    <div className={"text-red-600"}>{errors.password}</div>) : null}
                            </div>
                            <div className={"h-5"}></div>
                            <button className={"button w-full"} type={"submit"}>Submit</button>
                        </Form>)}
                </Formik>
                {errorMsg && <div className="text-red-600">{errorMsg}</div>}
                {successMsg && <div className="text-green-400">{successMsg}</div>}
                <button className={"link w-full"} onClick={() => {
                    setView(VIEWS.SIGN_IN)
                }}>Already have an account? Sign In
                </button>
            </div>
        </section>
    );
};

export default SignUp;