import {
  CreditCard,
  Users,
  Landmark,
  RefreshCw,
  ChartNoAxesColumn,
  Settings,
  LogOut
} from "lucide-react";

function Sidebar(){
    const menuItems = [
        {name:"Pagamentos",icon:CreditCard},
        {name:"Pessoas",icon:Users},
        {name:"Bancos",icon:Landmark},
        {name:"Reconciliação",icon:RefreshCw},
        {name:"Relatórios",icon:ChartNoAxesColumn},
        {name:"Configurações",icon:Settings}
    ];

    return(
        <aside className="sidebar">
            <div className="brand">
                <div className="brand-icon">P</div>

                <div>
                    <h2>PayGest</h2>
                    <span>Gestão de Pagamentos</span>
                </div>
            </div>

            <nav className="sidebar-menu">

                {menuItems.map((item, index) => {
                const Icon = item.icon;

                return (
                    <div
                    key={item.name}
                    className={`menu-item ${index === 0 ? "active" : ""}`}
                    >
                    <Icon size={20} />
                    <span>{item.name}</span>
                    </div>
                );
                })}

            </nav>

            <div className="sidebar-bottom">
                <div className="user-info">
                    <div className="avatar">A</div>

                    <div>
                        <strong>Administrador</strong>
                        <small>Admin@empresa.ao</small>
                    </div>
                </div>
            </div>

            <button className="logout">
                <LogOut size={18}/>
                Sair

            </button>
        </aside>
    );
}

export default Sidebar;