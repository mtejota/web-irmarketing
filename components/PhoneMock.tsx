"use client";

import Image from "next/image";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function PhoneMock({ children, className = "" }: Props) {
  return (
    <div
      className={`relative ${className}`}
      style={{ aspectRatio: "1280 / 2642" }}
    >
      {/* Frame decorativo — não faz parte da árvore acessível */}
      <span aria-hidden="true" className="pointer-events-none">
        <Image
          src="/PHONE.png"
          alt=""
          fill
          priority={false}
          sizes="(min-width: 1024px) 420px, 0px"
          className="select-none object-fill"
        />
      </span>

      {/* Área da tela: posicionada sobre o frame, clippada com bordas arredondadas */}
      <div
        className="absolute overflow-hidden"
        style={{
          top: "0.7%",
          right: "1.5%",
          bottom: "0.75%",
          left: "1.45%",
          borderRadius: "11% / 5.4%",
        }}
      >
        {/* Reserva espaço para câmeras — o preto do PNG mostra atrás */}
        <div className="flex h-full flex-col" style={{ paddingTop: "6.5%" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
