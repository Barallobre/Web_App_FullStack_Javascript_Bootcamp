import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./components/providers/AuthProvider";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import Main from "./pages/main/Main";
import AdministrarEspacios from "./pages/AdministrarEspacios";
import ReportarIncidencias from "./pages/ReportarIncidencias";
import IncidenciasAdmin from "./pages/IncidenciasAdmin";
import ModificarPerfil from "./pages/ModificarPerfil";
import ModificarEspacio from "./pages/ModificarEspacio";
import EspacioNuevo from "./pages/EspacioNuevo";
import Reservas from "./pages/Reservas";
import LogOut from "./components/auth/LogOut";
import ResultadoBusqueda from "./pages/ResultadoBusqueda";
import ConfirmarReserva from "./pages/ConfirmarReserva";
import MasInfo from "./pages/MasInfo";
function App() {
  return (
    <AuthProvider value={""}>
      <div className="content">
        <Router>
          <Navbar />
          <main>
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/login" exact component={LoginPage} />
              <Route path="/register" exact component={RegisterPage} />
              <Route path="/LogOut" exact component={LogOut} />
              <Route path="/busqueda" exact component={ResultadoBusqueda} />
              <Route path="/equipamiento/:id" component={MasInfo} />
              <Route path="/admin" exact component={AdministrarEspacios} />
              <Route
                path="/incidencias"
                exact
                component={ReportarIncidencias}
              />
              <Route
                path="/admin/:id/incidencias"
                component={IncidenciasAdmin}
              />
              <Route path="/perfil/" exact component={ModificarPerfil} />
              <Route
                path="/admin/:id/update"
                exact
                component={ModificarEspacio}
              />
              <Route path="/admin/nuevo" exact component={EspacioNuevo} />
              <Route path="/reservas" exact component={Reservas} />
              <Route path="/confirmar" component={ConfirmarReserva} />
              <Route path="/" render={() => <h1>404 Not Found</h1>} />
            </Switch>
          </main>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
