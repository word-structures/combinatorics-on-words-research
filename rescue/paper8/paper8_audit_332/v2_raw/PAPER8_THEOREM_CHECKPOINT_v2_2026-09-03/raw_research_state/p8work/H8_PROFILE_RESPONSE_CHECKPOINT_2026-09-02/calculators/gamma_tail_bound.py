#!/usr/bin/env python3
"""Evaluate the conditional geometric tail bound from the Gamma derivation note."""
import argparse, math
p=argparse.ArgumentParser()
p.add_argument('--q',type=float,required=True)
p.add_argument('--C3',type=float,required=True,help='Certified mixed-kernel constant')
p.add_argument('--rho',type=float,required=True)
p.add_argument('--R',type=int,required=True)
p.add_argument('--m',type=int,default=16)
p.add_argument('--fmax',type=float,default=2/3)
a=p.parse_args()
if not (0<a.rho<1): raise SystemExit('rho must be in (0,1)')
r=a.rho;R=a.R;m=a.m
bound=4*a.q*a.C3*a.fmax**2*r**(R+1)*((m-1)/(1-r)+2*((R+1)-R*r)/(1-r)**2)
print(f'{bound:.17g}')
