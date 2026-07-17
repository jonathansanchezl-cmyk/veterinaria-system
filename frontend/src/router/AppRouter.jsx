import {

    BrowserRouter,

    Routes,

    Route,

    Navigate

} from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Clientes from "../pages/Clientes";
import Mascotas from "../pages/Mascotas";
import Veterinarios from "../pages/Veterinarios";
import Citas from "../pages/Citas";
import Reportes from "../pages/Reportes";
import Usuarios from "../pages/Usuarios";
import Atencion from "../pages/Atencion";


import ProtectedRoute from "../components/auth/ProtectedRoute";

function AppRouter(){

    return(

        <BrowserRouter>

            <Routes>

                <Route

                    path="/"

                    element={<Login/>}

                />

                <Route

                    path="/dashboard"

                    element={

                        <ProtectedRoute

                            roles={[

                                "ADMINISTRADOR",

                                "VETERINARIO",

                                "OPERADOR"

                            ]}

                        >

                            <Dashboard/>

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/citas"

                    element={

                        <ProtectedRoute

                            roles={[

                                "ADMINISTRADOR",

                                "VETERINARIO",

                                "OPERADOR"

                            ]}

                        >

                            <Citas/>

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/clientes"

                    element={

                        <ProtectedRoute

                            roles={[

                                "ADMINISTRADOR",

                                "OPERADOR"

                            ]}

                        >

                            <Clientes/>

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/mascotas"

                    element={

                        <ProtectedRoute

                            roles={[

                                "ADMINISTRADOR",

                                "VETERINARIO",

                                "OPERADOR"

                            ]}

                        >

                            <Mascotas/>

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/historia/:id"

                    element={

                        <ProtectedRoute

                            roles={[

                                "ADMINISTRADOR",

                                "VETERINARIO"

                            ]}

                        >

                            <Atencion/>

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/veterinarios"

                    element={

                        <ProtectedRoute

                            roles={["ADMINISTRADOR"]}

                        >

                            <Veterinarios/>

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/usuarios"

                    element={

                        <ProtectedRoute

                            roles={["ADMINISTRADOR"]}

                        >

                            <Usuarios/>

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/reportes"

                    element={

                        <ProtectedRoute

                            roles={["ADMINISTRADOR"]}

                        >

                            <Reportes/>

                        </ProtectedRoute>

                    }

                />



                <Route

                    path="*"

                    element={

                        <Navigate

                            to="/dashboard"

                            replace

                        />

                    }

                />

            </Routes>

        </BrowserRouter>

    );

}

export default AppRouter;
