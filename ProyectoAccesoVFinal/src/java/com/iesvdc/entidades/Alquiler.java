/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.iesvdc.entidades;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author david
 */
@Entity
@Table(name = "Alquiler")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Alquiler.findAll", query = "SELECT a FROM Alquiler a")
    , @NamedQuery(name = "Alquiler.findByIdAlquiler", query = "SELECT a FROM Alquiler a WHERE a.idAlquiler = :idAlquiler")
    , @NamedQuery(name = "Alquiler.findByFecha", query = "SELECT a FROM Alquiler a WHERE a.fecha = :fecha")})
public class Alquiler implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_alquiler")
    private Integer idAlquiler;
    @Basic(optional = false)
    @Column(name = "fecha")
    @Temporal(TemporalType.DATE)
    private Date fecha;
    @JoinColumn(name = "dni_alumno", referencedColumnName = "dni")
    @ManyToOne
    private Alumnos dniAlumno;
    @JoinColumn(name = "isbn_libro", referencedColumnName = "isbn")
    @ManyToOne
    private Libros isbnLibro;

    public Alquiler() {
    }

    public Alquiler(Integer idAlquiler) {
        this.idAlquiler = idAlquiler;
    }

    public Alquiler(Integer idAlquiler, Date fecha) {
        this.idAlquiler = idAlquiler;
        this.fecha = fecha;
    }

    public Integer getIdAlquiler() {
        return idAlquiler;
    }

    public void setIdAlquiler(Integer idAlquiler) {
        this.idAlquiler = idAlquiler;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Alumnos getDniAlumno() {
        return dniAlumno;
    }

    public void setDniAlumno(Alumnos dniAlumno) {
        this.dniAlumno = dniAlumno;
    }

    public Libros getIsbnLibro() {
        return isbnLibro;
    }

    public void setIsbnLibro(Libros isbnLibro) {
        this.isbnLibro = isbnLibro;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idAlquiler != null ? idAlquiler.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Alquiler)) {
            return false;
        }
        Alquiler other = (Alquiler) object;
        if ((this.idAlquiler == null && other.idAlquiler != null) || (this.idAlquiler != null && !this.idAlquiler.equals(other.idAlquiler))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.iesvdc.entidades.Alquiler[ idAlquiler=" + idAlquiler + " ]";
    }
    
}
