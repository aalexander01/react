import {FaFacebookF,  FaWhatsapp,  FaYoutube,  FaMapMarkerAlt,} from "react-icons/fa";
import "./Foot.css"
import logo from "./assets/logo.ico";

function Item({ icon, text }) {
  return (
    <div className="item">
      <div className="icon">{icon}</div>

      <div className="box">
        <p>{text}</p>
      </div>
    </div>
  );
}

export default function Foot(props) {
  return (
    <div className="container">

      {/* IZQUIERDA */}
      <div className="left">
        <div className="logo">
            <img src={logo} alt="" />
        </div>
        
        <Item
          icon={<FaMapMarkerAlt />}
          text="Colombia - Bogotá - Kennedy - Calle 67A Ac 45T"
        />

        <Item
          icon={<FaMapMarkerAlt />}
          text="Rusia - Rummia - Bekady - Calle 67A Ac 45T - 000ast"
        />
      </div>

      {/* DERECHA */}
      <div className="right">
        <Item
          icon={<FaFacebookF />}
          text="Facebook"
        />

        <Item
          icon={<FaWhatsapp />}
          text="+57 311 - 661 - 3311"
        />

        <Item
          icon={<FaYoutube />}
          text="Youtube"
        />
      </div>

    </div>
  );
}