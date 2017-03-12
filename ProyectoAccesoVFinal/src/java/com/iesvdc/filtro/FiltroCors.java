/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.iesvdc.filtro;

import java.io.IOException;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author david
 */
@WebFilter(filterName = "FiltroCors", urlPatterns = {"/*"})
public class FiltroCors implements Filter {

 public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
  HttpServletResponse response = (HttpServletResponse) res;
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
  response.setHeader("Access-Control-Max-Age", "3600");
  response.setHeader("Access-Control-Allow-Headers", "Origin, x-requested-with, Content-Type, Accept");
  response.setHeader("Cache-Control", "must-revalidate");
  response.setHeader("Cache-Control", "no-cache");
response.setHeader("Pragma", "no-cache");
  chain.doFilter(req, res);
 }

 public void init(FilterConfig filterConfig) {}

 public void destroy() {}
 
}
