'use client';

import {useState} from 'react';
import cn from 'classnames';
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';

import {useAuth, VIEWS} from 'src/components/AuthProvider';
import supabase from 'src/lib/supabase-browser';

const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
});

const ResetPassword = () => {
    const {setView} = useAuth();
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    async function resetPassword(formData) {
        const {error} = await supabase.auth.resetPasswordForEmail(formData?.email, {
            redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_BASE_URL}`,
        });

        if (error) {
            setErrorMsg(error.message);
        } else {
            setSuccessMsg('Password reset instructions sent.');
        }
    }

    return (
        <section className={"flex-center"}>
            <div className="card">
                <h3>Forgot Password</h3>
                <Formik
                    initialValues={{
                        email: '',
                    }}
                    validationSchema={ResetPasswordSchema}
                    onSubmit={resetPassword}
                >
                    {({errors, touched}) => (
                        <Form className="column w-full">
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
                            <button className="button w-full" type="submit">
                                Send Instructions
                            </button>
                        </Form>
                    )}
                </Formik>
                {errorMsg && <div className="text-center text-red-600">{errorMsg}</div>}
                {successMsg && <div className="text-center text-black">{successMsg}</div>}
                <button className="link w-full" type="button" onClick={() => setView(VIEWS.SIGN_IN)}>
                    Remember your password? Sign In.
                </button>
            </div>
        </section>
    );
};

export default ResetPassword;