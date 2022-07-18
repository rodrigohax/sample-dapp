import { Injectable } from '@angular/core';
import { ethers } from "ethers";
import { environment } from "../../environments/environment";
import Sample from '../../../../contracts/contracts_Sample_sol.json'
import detectEthereumProvider from '@metamask/detect-provider';

@Injectable({
  providedIn: 'root'
})
export class SampleService {
  public async getOwner(): Promise<any[]> {
    const contract = await SampleService.getContract()

    return await contract['getOwner']()
  }

  public async getBalance(): Promise<any[]> {
    const contract = await SampleService.getContract(true)

    return await contract['getBalance']()
  }

  private static async getContract(bySigner = false) {
    const provider = await SampleService.getWebProvider()
    const signer = provider.getSigner()

    return new ethers.Contract(
      environment.contractAddress,
      Sample,
      bySigner ? signer : provider,
    )
  }

  private static async getWebProvider(requestAccounts = true) {
    const provider: any = await detectEthereumProvider()

    if (requestAccounts) {
      await provider.request({ method: 'eth_requestAccounts' })
    }

    return new ethers.providers.Web3Provider(provider)
  }
}
