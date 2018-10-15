import React from 'react';
import {addFile} from '../util/ipfsUtil'

class Pic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hash: "",
            inputHash: ""
        }
    }

    render() {
        const { hash, inputHash } = this.state;
        return (
            <div>
                <h2>图片上传及获取</h2>
                <div>
                    <h3>图片上传</h3><hr/>
                    <fieldset>
                        <legend>请选择文件: </legend>
                        <input type="file" multiple ref={input => this.fileInput = input}/>
                    </fieldset>

                    <button onClick={() => {
                        let files = this.fileInput.files;
                        // console.log(files);
                        const file = files[0];

                        //在utils封装好后,这样调用  防止文件大的时候回卡死,用异步操作
                        addFile(file)
                            .then(hash => {
                                this.setState({hash, inputHash: hash})
                            })
                            .catch(e => console.error(e))

                        /*
                        (async () => {
                            console.log("----1");
                            const hash = await addFile(file)
                            console.log(hash);
                            this.setState({hash, inputHash: hash})
                            console.log("----2");
                        })();
                        */

                        console.log("----3");

                    }}>上传图片</button>

                    {hash && <p>图片Hash: {hash}</p>}

                </div>
                <div>
                    <h3>图片获取</h3><hr/>

                    <input type="text" placeholder='请输入图片hash' value={inputHash}
                           onChange={(e) => this.setState({inputHash: e.target.value})}/>

                    <button onClick={() => this.setState({hash: inputHash})}>查看图片</button>

                    {
                        hash && (
                            <div>
                                <img src={`http://127.0.0.1:8080/ipfs/${hash}`} alt="黑马图片"/>
                            </div>
                        )
                    }

                </div>
            </div>
        );
    }
}

export default Pic;
