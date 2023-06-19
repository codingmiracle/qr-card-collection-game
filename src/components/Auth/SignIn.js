'use client';

import {useState} from 'react';
import {useAuth, VIEWS} from 'src/components/Auth/AuthProvider';
import supabase from 'src/service/supabase/supabase-browser';
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import cn from "classnames";

const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'), password: Yup.string().required('Required'),
});

const SignIn = () => {
    const {setView} = useAuth();
    const [errorMsg, setErrorMsg] = useState(null);

    async function onSubmit(formData) {
        const {error} = await supabase.auth.signInWithPassword({
            email: formData.email, password: formData.password,
        });

        if (error) {
            setErrorMsg(error.message);
        }
    }

    return (<section className={"flex-center"}>
        <div className="card-container">
            <h3 className={"w-full"}>Sign In</h3>
            <Formik initialValues={{
                email: '', password: ''
            }} validationSchema={SignInSchema} onSubmit={onSubmit}>
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
                        <button className={"link w-full text-right"} type={"button"} onClick={() => {
                            setView(VIEWS.FORGOTTEN_PASSWORD)
                        }}>Forgot your Password?
                        </button>
                        <button className={"button w-full"} type={"submit"}>Submit</button>
                    </Form>)}
            </Formik>
            {errorMsg && <div className="text-red-600">{errorMsg}</div>}
            <button className={"link w-full"} onClick={() => {
                setView(VIEWS.SIGN_UP)
            }}>Don&apos;t have an account? Sign up
            </button>
        </div>
    </section>);
};

export default SignIn;