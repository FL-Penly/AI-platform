<template>
    <div style="margin-top: 20px">
        <div style="text-align: center">
            <span style="font-size: 30px;color: black;color: #58291b;font-weight: bold">目标检测</span>
        </div>

        <el-row style="text-align: center;margin-top: 20px">
            <el-col :span="8" :offset="4">
                <span style="font-size: 20px;font-weight: bold;color: #66391a;">参数配置</span>
                <div style="margin-top: 20px;color: #66391a">
                    <span style="display: inline-block;width: 200px;">请选择一个模型</span>
                    <el-select v-model="form.optionsValue" class="m-2" placeholder="Select" size="large">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        />
                    </el-select>
                </div>

                <div style="margin-top: 20px;color: #66391a">
                    <span style="display: inline-block;width: 200px;">一次训练图片数量</span>
                    <el-input v-model="form.batchSize" style="width: 220px" type="text"
                              placeholder="请输入batchsize"></el-input>
                </div>

                <div style="margin-top: 20px;color: #66391a">
                    <span style="display: inline-block;width: 200px;">训练轮次数量</span>
                    <el-input v-model="form.epochs" style="width: 220px" type="text"
                              placeholder="请输入epochs"></el-input>
                </div>

                <div style="margin-top: 20px;color: #66391a">
                    <span style="display: inline-block;width: 200px;">训练图片地址</span>
                    <el-select v-model="form.addressValue" class="m-3" placeholder="Select" size="large">
                        <el-option
                                v-for="item in address"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        />
                    </el-select>
                </div>

                <div style="margin-top: 20px;color: #66391a">
                    <span style="display: inline-block;width: 200px;">训练标签地址</span>
                    <el-select v-model="form.labelValue" class="m-3" placeholder="Select" size="large">
                        <el-option
                                v-for="item in labelAddress"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        />
                    </el-select>
                </div>

                <div style="margin-top: 30px;">
                    <el-button style="width: 200px" type="success" plain @click="loadConfig()">导入配置</el-button>
                </div>

            </el-col>

            <el-col :span="8">
                <span style="font-size: 20px;font-weight: bold;color: #66391a;display: inline-block">模型测试输出</span>
                <el-row>
                    <el-col :span="20" style="margin-top: 20px;position: relative">
                        <el-image
                                style="width: 50%; height: 100%;background-color: #F2F3F5;left: 70px"
                                :src="imageUrl" :fit="fit">
                            <template #error>
                                <div class="image-slot"
                                     style="display: flex;justify-content: center;align-items: center;width: 100%; height: 100%;">
                                    <span style="color: #606266">推断结果</span>
                                </div>
                            </template>
                        </el-image>
                    </el-col>
                    <el-col :span="4"
                            style="align-items: center">
                        <el-row style="margin-top: 80px">
                            <el-button @click="train()" style="width: 100px" type="success" plain
                                       :disabled="!trainButton">训练模型
                            </el-button>
                        </el-row>
                        <el-row style="margin-top: 30px">
                            <el-button @click="stopTrain()" style="width: 100px" type="danger" plain>停止训练
                            </el-button>
                        </el-row>
                        <el-row style="margin-top: 30px">
                            <el-upload
                                    class="upload-demo"
                                    action="http://127.0.0.1:5000/upload"
                                    v-model:file-list="fileList"
                                    :limit="1"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload"
                                    :data="model_name"
                            >
                                <el-button @click="inference()" style="width: 100px" type="info" plain>推断模型
                                </el-button>
                            </el-upload>
                        </el-row>

                    </el-col>
                </el-row>

            </el-col>
        </el-row>

        <el-row style="text-align: center;margin-top: 20px">
            <el-col :span="8" :offset="4" style="padding-right: 30px">
                <span style="font-size: 20px;font-weight: bold;color: #66391a;">任务列表</span>
                <div style="width: 100%;">
                    <el-scrollbar height="300px" ref="scrollbarRef">
                        <el-input
                                v-model="logMessage"
                                type="textarea"
                                resize="none"
                                readonly
                                :autosize="{ minRows: 13}"
                                ref="terminalInput"
                                style="width: 100%"
                        />
                    </el-scrollbar>
                </div>
            </el-col>

            <el-col :span="8" style="margin-left: 60px">
                <span style="font-size: 20px;font-weight: bold;color: #66391a;">输出信息</span>
                <div style="width: 100%;margin-left: 20px">
                    <el-scrollbar height="300px" style="margin-right: 50px" ref="scrollbarRef1">
                        <el-input
                                v-model="terminalMessage"
                                type="textarea"
                                readonly
                                resize="none"
                                :autosize="{ minRows: 13}"
                                style="width: 100%"
                        />
                    </el-scrollbar>
                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script setup>
import {onMounted, reactive, ref, watch, watchEffect} from "vue";
import {ElMessage} from "element-plus";
import axios from "axios";

const trainButton = ref(true)

const loadFlag = ref(false)
const stopFlag = ref(false)

const logMessage = ref('')
const scrollbarRef = ref(null)
const value = ref(0)

const scrollbarRef1 = ref(null)
const value1 = ref(0)

const terminalMessage = ref('')
const imageUrl = ref('')

var source = null;

const fileList = ref()


onMounted(() => {
    console.log(`the component is now mounted.`)
    axios.post('/loadConfig', {
        task: "detection"
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log(options)
            for (let i = 0; i < response.data.address.length; i++) {
                address.value.push({
                    value: response.data.address[i],
                    label: response.data.address[i]
                })
                labelAddress.value.push({
                    value: response.data.address[i],
                    label: response.data.address[i]
                })
            }
            for (let i = 0; i < response.data.model.length; i++) {
                options.value.push({
                    value: response.data.model[i],
                    label: response.data.model[i]
                })
            }
            console.log(options)
        })
        .catch(error => {
            console.error('Error:', error);
        })
})

const beforeAvatarUpload = (rawFile) => {
    if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        ElMessage.error('图片必须是jpg或png格式')
        return false
    }
    imageUrl.value = ''
    return true
}

const handleAvatarSuccess = (response, uploadFile) => {
    // imageUrl.value = 'http://localhost:5000/static/vis/' + fileList.value[0].name
    const uniqueString = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    imageUrl.value = `http://localhost:5000/static/vis/${fileList.value[0].name}?v=${uniqueString}`;
}

const train = () => {
    if (loadFlag.value === false) {
        ElMessage({
            message: '请先导入配置',
            type: 'warning'
        })
        addLog('请先导入配置')
        return
    }
    addLog('开始训练模型')
    trainButton.value = false
    axios.post('/train', {
        model_name: form.optionsValue,
        batch_size: form.batchSize,
        epochs: form.epochs,
        train_address: form.addressValue,
        label_address: form.labelValue,
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            source = new EventSource('http://127.0.0.1:5000/stream');
            console.log('SSE 连接建立');
            // 建立 SSE 连接，接收实时训练信息
            source.addEventListener('open', () => {
                console.log('SSE connection opened');
            });
            source.addEventListener('error', () => {
                console.error('SSE connection error');
            });
            source.addEventListener('training_output', data => {
                // 将实时训练信息传递给回调函数
                console.log('SSE message received');
                data = JSON.parse(data.data);
                addTerminal(data);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        })
        .finally(() => {
            loadFlag.value = false
        });
}
const stopTrain = () => {
    addLog('停止训练模型')
    axios.post('/stop')
        .then(response => {
            addLog('停止训练模型成功')
            stopFlag.value = true
            trainButton.value = true
        })
        .catch(error => {
            console.log('停止训练失败');
            addLog('停止训练模型失败')
        });

}

const inference = () => {
    fileList.value = []
    ElMessage.warning("推断前请先上传图片")
    addLog('开始推断模型')
    addLog('推断模型完成')
}

const addTerminal = (message) => {
    console.log(message)
    if (message.data === '训练完成' && stopFlag.value === true) {
        trainButton.value = true
        stopFlag.value = false
        source.close()
        scrollbarRef1.value.setScrollTop(value.value + 30000)
        value1.value += 100
        return
    }
    terminalMessage.value = terminalMessage.value + message.data + '\n'
    scrollbarRef1.value.setScrollTop(value.value + 30000)
    value1.value += 100
}

const addLog = (message) => {
    logMessage.value = logMessage.value + message.toString() + '\n'
    scrollbarRef.value.setScrollTop(value.value + 1000)
    value.value += 100
}


const form = reactive({
    optionsValue: '',
    addressValue: '',
    labelValue: '',
    batchSize: '',
    epochs: '',
})

const model_name = reactive({
    model: '',
});

watchEffect(() => {
    model_name.model = form.optionsValue;
});

const options = ref([])
const address = ref([])
const labelAddress = ref([])

// const options = ref()
//
// const address = []
//
// const labelAddress = []

const loadConfig = () => {
    if (form.optionsValue === '' | form.addressValue === '' | form.labelValue === '' | form.batchSize === '' | form.epochs === '') {
        ElMessage.error("请选择参数信息")
        addLog("请选择参数信息")
    } else {
        ElMessage.success("导入成功")
        addLog("导入成功")
        loadFlag.value = true
    }
}

</script>

<style scoped>
</style>