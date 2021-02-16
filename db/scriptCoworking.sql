create database if not exists coworking ;
use coworking;

create table TipoEspacio(
    IdTipoEspacio smallint  not null auto_increment,
    NombreTipo varchar(20) not null,
    primary key (IdTipoEspacio)
);
insert into TipoEspacio(NombreTipo) values ('diáfano'),('pet-friendly'),('sala de juntas'),('eco-friendly');

create table TipoIncidencia(
    IdTipoIncidencia smallint not null auto_increment,
    NombreTipo varchar(20) not null,
    primary key (IdTipoIncidencia)
);
insert into TipoIncidencia(NombreTipo) values('Fallo eléctrico'),('Goteras'),('Equipo deteriorado'),('Suciedad'),('Otras quejas');

create table TipoEquipamiento(
    IdTipoEquipamiento smallint not null auto_increment,
    TipoEquipamiento varchar(20) not null,
    primary key (IdTipoEquipamiento)
);

insert into TipoEquipamiento(TipoEquipamiento) values  ("Sillas"),("Mesas"),("Proyector"),("Pantalla"),("Monitores");
create table Usuario(
    IdUsuario int not null auto_increment,
    Nombre varchar(50),
    Apellidos varchar(50),
    Email varchar(50),
    Bio varchar(2000),
    Foto varchar(100),
    Password varchar(100),
    Administrador boolean default null,
    primary key (IdUsuario)
);

create table Espacio(
    IdEspacio int not null auto_increment,
    Nombre varchar(50),
    Localidad varchar(20),
    idTipoEspacio smallint,
    FechaInicioDisponibilidad date,
    FechaFinDisponibilidad date,
    Foto varchar(100),
    CosteDiario decimal(4,2),
    primary key (IdEspacio),
    foreign key (idTipoEspacio) references TipoEspacio(idTipoEspacio)
);

create table Incidencia(
    IdIncidencia smallint not null auto_increment,
    idTipoIncidencia smallint,
    idEspacio int,
    Descripcion varchar(100),
    FechaAlta date,
    primary key (IdIncidencia),
    foreign key (idTipoIncidencia) references TipoIncidencia (idTipoIncidencia),
    foreign key (idEspacio) references Espacio(IdEspacio)
);

create table EquipamientoEspacio(
    IdEspacio int not null,
    IdTipoEquipamiento smallint not null,
    Cantidad smallint unsigned,
    primary key(IdEspacio, IdTipoEquipamiento),
    foreign key (IdEspacio) references Espacio(IdEspacio),
    foreign key (IdTipoEquipamiento) references TipoEquipamiento (IdTipoEquipamiento)
);

create table Reserva(
    IdReserva int not null auto_increment,
    FechaInicio date,
    FechaFin date,
    idUsuario int,
    idEspacio int,
    Pagado boolean default null,
    primary key (IdReserva),
    foreign key (idUsuario) references Usuario(idUsuario),
    foreign key (idEspacio) references Espacio(idEspacio)
);


select * from Usuario;
select * from Espacio;
select * from EquipamientoEspacio;
select*from tipoEspacio;
select* from tipoIncidencia;
select * from tipoEquipamiento;
select*from Reserva;
select * from Incidencia;

