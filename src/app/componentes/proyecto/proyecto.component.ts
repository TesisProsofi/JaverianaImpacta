import { Component } from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {NgClass} from "@angular/common";
import {SidebarService} from "../../servicios/sidebar/sidebar.service";
import {ProyectoService} from "../../servicios/proyecto/proyecto.service";
import {Proyecto} from "../../dominio/proyecto";
import {EntidadService} from "../../servicios/entidad/entidad.service";
import {PersonaService} from "../../servicios/persona/persona.service";
import {Entidad} from "../../dominio/entidad";
import {Persona} from "../../dominio/persona";

@Component({
  selector: 'app-proyecto',
  standalone: true,
  imports: [
    SidebarComponent,
    NgClass
  ],
  templateUrl: './proyecto.component.html',
  styleUrl: './proyecto.component.css'
})
export class ProyectoComponent {
  protected proyectos : Proyecto[];
  protected entidades : Entidad[];
  protected personas : Persona[];
  protected visible : boolean;

  constructor(private servicioSidebar : SidebarService, private servicioProyecto : ProyectoService, private servicioEntidad : EntidadService, private servicioPersona : PersonaService) {
    this.proyectos = [];
    this.entidades = [];
    this.personas = [];
    this.visible = servicioSidebar.obtenerVisible();
    this.servicioSidebar.sidebarVisible.subscribe(dato => {
      this.visible = dato;
    });
    this.obtenerProyectos();
    this.obtenerEntidades();
    this.obtenerPersonas();
  }
  private obtenerProyectos(){
    this.servicioProyecto.obtenerProyectos().subscribe(
      datos => this.proyectos = datos
    );
  }

  private obtenerEntidades() {
    this.servicioEntidad.obtenerEntidades().subscribe(
      datos => this.entidades = datos
    );
  }

  private obtenerPersonas() {
    this.servicioPersona.obtenerPersonas().subscribe(
      datos => this.personas = datos
    );
  }
  protected obtenerEntidad(nit : number) : string{
      let auxiliar = "No encontrado";
      this.entidades.forEach(entidad => {
        if(entidad.nit == nit){
          auxiliar = entidad.razon_social;
        }
      });
      return auxiliar;
  }

  protected obtenerLider(cedula: number) {
    let auxiliar = "No encontrado";
    this.personas.forEach(persona => {
      if(persona.cedula == cedula){
        auxiliar = persona.primer_nombre+" "+persona.primer_apellido;
      }
    });
    return auxiliar;
  }
}