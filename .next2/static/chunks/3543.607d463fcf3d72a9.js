"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3543],{63543:function(t,r,e){e.r(r),e.d(r,{MarketplaceV3:function(){return s}});var a=e(72548);e(13550),e(2162),e(64063),e(77191),e(54146),e(54098);class s{static contractRoles=a.dr;get directListings(){return(0,a.b_)(this.detectDirectListings(),a.dt)}get englishAuctions(){return(0,a.b_)(this.detectEnglishAuctions(),a.du)}get offers(){return(0,a.b_)(this.detectOffers(),a.dv)}get chainId(){return this._chainId}constructor(t,r,e){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},c=arguments.length>4?arguments[4]:void 0,i=arguments.length>5?arguments[5]:void 0,h=arguments.length>6&&void 0!==arguments[6]?arguments[6]:new a.d4(t,r,c,n,e);this._chainId=i,this.abi=a.e.parse(c||[]),this.contractWrapper=h,this.storage=e,this.metadata=new a.ag(this.contractWrapper,a.ds,this.storage),this.app=new a.a$(this.contractWrapper,this.metadata,this.storage),this.roles=new a.ah(this.contractWrapper,s.contractRoles),this.encoder=new a.af(this.contractWrapper),this.estimator=new a.aP(this.contractWrapper),this.events=new a.aQ(this.contractWrapper),this.platformFees=new a.aS(this.contractWrapper),this.interceptor=new a.aR(this.contractWrapper)}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t)}getAddress(){return this.contractWrapper.readContract.address}async prepare(t,r,e){return a.aV.fromContractWrapper({contractWrapper:this.contractWrapper,method:t,args:r,overrides:e})}async call(t,r,e){return this.contractWrapper.call(t,r,e)}detectDirectListings(){if((0,a.b$)(this.contractWrapper,"DirectListings"))return new a.aM(this.contractWrapper,this.storage)}detectEnglishAuctions(){if((0,a.b$)(this.contractWrapper,"EnglishAuctions"))return new a.aN(this.contractWrapper,this.storage)}detectOffers(){if((0,a.b$)(this.contractWrapper,"Offers"))return new a.aO(this.contractWrapper,this.storage)}}}}]);